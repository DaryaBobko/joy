using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using JoyBusinessService.Models.PostsModels;
using JoyBusinessService.Services.Interfaces;

namespace DiplomAPI.Controllers
{
    public class PostController : ApiController
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        public void Post(PostModel post)
        {
            //_postService.AddPost(post);
            //var bytes = Encoding.UTF8.GetBytes(post.SelectedFile);
            //var memoryStream = new MemoryStream(bytes);
            //var file = FileStream.Read
            var path = AppDomain.CurrentDomain.BaseDirectory;
            path = Path.Combine(path, post.Images[0].Name);
            File.WriteAllBytes(path, post.Images[0].Content);
            //var file = File.()
        }
    }
}
