using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using DiplomAPI.Controllers.Base;
using DiplomAPI.Filters;
using Joy.Business.Services.Repositories;
using JoyBusinessService.Enums;
using JoyBusinessService.Models.PostsModels;
using JoyBusinessService.Models.PropertyModels;
using JoyBusinessService.Models.SearchModels;
using JoyBusinessService.Services.Interfaces;
using Model;

namespace DiplomAPI.Controllers
{
    
    public class PostController : BaseController
    {
        private readonly IPostService _postService;
        private readonly IRepository _repository;
        public PostController(IPostService postService, IRepository repository)
        {
            _postService = postService;
            _repository = repository;
        }

        [AllowAnonymous]
        [Route("api/post/getPosts")]
        [HttpPost]
        public List<PostViewModel> GetPosts(PostSearchMidel searchModel)
        {
            var searchedPosts = _postService.GetPosts(searchModel);
            return searchedPosts;
        }

        public int Post(PostModel post)
        {
            return _postService.AddPost(post);
            
        }

        public PostViewModel Get(int id)
        {
            return _postService.GetById(id);
        }

        [Route("api/post/getUserPosts")]
        [HttpGet]
        public List<PostViewModel> GetUserPosts(int? id = null, PostStatus? status = null)
        {
            var posts = _postService.GetUserPosts(id, status);
            return posts;
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _postService.Remove(id);
        }

        [HttpPut]
        public void Put(PostModel post)
        {
            _postService.Update(post);
        }

        [HttpPost]
        [Route("api/post/approvePost")]
        public void ApprovePost(PostValidationModel model)
        {
            _postService.ApprovePost(model);
        }

        [HttpPatch]
        public void Patch(PropertyModel model)
        {
            int value = 0;
            if (Int32.TryParse(model.Value.ToString(), out value))
            {
                model.Value = value;
            }
            
            _repository.UpdateProperty<Post>(model.Id, model.PropertyName, model.Value);
            _repository.Commit();
        }
    }
}
