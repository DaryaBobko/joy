using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Joy.Business.Services.Repositories;
using JoyBusinessService.Models.PostsModels;
using JoyBusinessService.Models.SearchModels;
using JoyBusinessService.Services.Interfaces;
using Model;
using System.Data.Entity;
using System.Text.RegularExpressions;
using JoyBusinessService.Models;

namespace JoyBusinessService.Services.Implementations
{
    public class PostService : IPostService
    {

        private readonly IRepository _repository;
        public PostService(IRepository repository)
        {
            _repository = repository;
        }

        public int AddPost(PostModel post)
        {
            var tags = _repository.GetList<Tag>(x => post.SelectedTags.Contains(x.Id));
            var entry = new Post() {Tittle = post.Header, ContentText = post.Message, Tags = tags.ToList()};
            _repository.Add(entry);
            _repository.Commit();
            //foreach (var tagId in post.SelectedTags)
            //{
            //    _repository.Add(new PostTag() {PostId = entry.Id, TagId = tagId});
            //}
            //_repository.Commit();
            return entry.Id;
        }

        public List<PostViewModel> GetPosts(PostSearchMidel searchModel)
        {
            var results = new List<PostViewModel>();
            var query = _repository.GetList<Post>(null, i => i.Include(x => x.Tags));
            if (searchModel.TagId != null)
            {
                query = query.Where(x => x.Tags.Any(y => y.Id == searchModel.TagId));
                results = query.Select(x => CreatePostViewModel(x, 1)).ToList();
            }
            else
            {
                var splitedText = searchModel.SaerchText.Split(' ');
                var splitedByFor = Regex.Split(searchModel.SaerchText, @"\w+ \w+ \w+ \w+");


                var searchByTags = query.Where(x => x.Tags.Any(y => splitedText.Any(s => s == y.Name))).Select(x => CreatePostViewModel(x, 1));
                //var searchByContent = query.Where(x => x.ContentText.con)
            }
            return results.OrderBy(x => x.Priority).ToList();
        }

        private PostViewModel CreatePostViewModel(Post post, int priority = 1)
        {
            return new PostViewModel()
            {
                Priority = priority,
                CreatedOn = post.CreatedOn,
                Header = post.Tittle,
                Message = post.ContentText,
                SelectedTags = post.Tags.Select(x => new IdNameModel() { Id = x.Id, Name = x.Name}).ToList(),
                User = new IdNameModel() { Id = post.User.Id, Name = post.User.Email}
            };
        }
    }
}
