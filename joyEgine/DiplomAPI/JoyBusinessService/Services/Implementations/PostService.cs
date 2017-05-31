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
using System.IO;
using System.Runtime.Remoting.Messaging;
using System.Security.Principal;
using System.Text.RegularExpressions;
using AutoMapper;
using Joy.Data.Common;
using JoyBusinessService.Enums;
using JoyBusinessService.Models;
using JoyBusinessService.Models.UrlModels;

namespace JoyBusinessService.Services.Implementations
{
    public class PostService : IPostService
    {

        private readonly IRepository _repository;
        private readonly IIdentity _identity;
        private int UserId => int.Parse(_identity.Name);
        public PostService(IRepository repository)
        {
            _repository = repository;
            _identity = ServiceLocator.GetService<IIdentity>();
        }

        private string SaveFile(PostModel post)
        {
            post.Images[0].Name = post.Images[0].Name.Replace("\"", "");
            var path = AppDomain.CurrentDomain.BaseDirectory;
            path = Directory.GetParent(path).Parent.Parent.FullName;

            path = Path.Combine(path, "DiplomWEB\\content\\dynamicFiles", post.Images[0].Name);
            File.WriteAllBytes(path, post.Images[0].Content);
            return path;
        }

        public int SavePostFile(PostModel post) 
        {
            var fileName = SaveFile(post);
            var file = new MediaContent()
            {
                Name = post.Images[0].Name,
                Path = fileName,
                TypeId = (int)MeidaContentType.Image
            };
            _repository.Add(file);
            _repository.Commit();
            return file.Id;
        }

        public int AddPost(PostModel post)
        {
            //post.SelectedTags = new List<int>() {1, 2};
            var status = (int)PostStatus.NeedVerify;
            //if (_repository.Any<UserToRole>(x => x.UserId == UserId && x.RoleId == (int)Enums.UserRole.Admin))
            //{
            //    status = (int)PostStatus.Approved;
            //}
            var tags = _repository.GetList<Tag>(x => post.SelectedTags.Contains(x.Id)).ToList();
            var entry = new Post() {Tittle = post.Header, ContentText = post.Message, Status = status };
            _repository.Add(entry);
            _repository.Commit();
            foreach (var tag in tags)
            {
                _repository.Add<PostTag>(new PostTag() {PostId = entry.Id, TagId = tag.Id});
            }
            _repository.Commit();
            if (post.Images.Count() != 0)
            {
                var fileId = SavePostFile(post);
                    
                _repository.Add(new PostMediaContent() { MediaContentId = fileId, PostId = entry.Id });
                _repository.Commit();
            }
            return entry.Id;
        }

        public List<PostViewModel> GetPosts(PostSearchMidel searchModel)
        {
            var results = new List<PostViewModel>();
            var query = _repository.GetList<Post>(x => x.Status == (int)PostStatus.Approved, i => i.Include(x => x.PostTags.Select(y => y.Tag)).Include(x => x.User).Include(x => x.PostMediaContents.Select(y => y.MediaContent)));
            
            if (searchModel == null)
            {
                return query.ToList().Select(x => CreatePostViewModel(x, 1)).OrderBy(x => x.CreatedOn).ToList();
            }
            if (searchModel.TagId != null)
            {
                query = query.Where(x => x.PostTags.Any(y => y.TagId == searchModel.TagId));
                results = query.ToList().Select(x => CreatePostViewModel(x, 1)).ToList();
            }
            else
            {
                var splitedText = searchModel.SaerchText.Split(' ');
                var splitedBy4 = new List<string>();
                var matches = Regex.Matches(searchModel.SaerchText, @"\w+ \w+ \w+ \w+");
                foreach (var match in matches)
                {
                    splitedBy4.Add(match.ToString());
                }
                
                var searchByHeader = query.Where(x => x.Tittle.Contains(searchModel.SaerchText));
                var searchByInnerText = query.Where(x => x.ContentText.Contains(searchModel.SaerchText));
                var searchByTags = query.Where(x => x.PostTags.Any(y => splitedText.Any(s => s == y.Tag.Name)));
                var union = searchByHeader.Union(searchByInnerText).Union(searchByTags);
                foreach (var oneSplitedPiece in splitedBy4)
                {
                    var searchByPieces = query.Where(x => x.ContentText.Contains(oneSplitedPiece));
                    union = union.Union(searchByPieces);
                }
                results = union.Distinct().ToList().Select(x => CreatePostViewModel(x, 1)).ToList();
            }
            return results.OrderByDescending(x => x.CreatedOn).ToList();
        }

        private PostViewModel CreatePostViewModel(Post post, int priority = 1)
        {
            var imagePath = post.PostMediaContents.FirstOrDefault()?.MediaContent.Path;
            if (imagePath != null)
            {
                imagePath = imagePath.Substring(imagePath.IndexOf("content", StringComparison.Ordinal));
            }

            return new PostViewModel()
            {
                Id = post.Id,
                Priority = priority,
                CreatedOn = post.CreatedOn,
                Header = post.Tittle,
                Message = post.ContentText,
                Tags = post.PostTags.Select(y => y.Tag).Select(x => new IdNameModel() { Id = x.Id, Name = x.Name}).ToList(),
                User = new IdNameModel() { Id = post.User.Id, Name = post.User.Email},
                ImagePath = imagePath,
                Images = new List<UrlViewModel>() { new UrlViewModel() {url = imagePath }  }
            };
        }

        public PostViewModel GetById(int id)
        {
            var post = GetPostById(id);
            return CreatePostViewModel(post);
        }

        private Post GetPostById(int id)
        {
            return _repository.Get<Post>(x => x.Id == id, i => i.Include(x => x.PostTags.Select(y => y.Tag)).Include(x => x.User).Include(x => x.PostMediaContents.Select(y => y.MediaContent)));
        }
        public List<PostViewModel> GetUserPosts(int? id, PostStatus? status)
        {
            var query = _repository.GetList<Post>(null, i => i.Include(x => x.PostTags.Select(y => y.Tag)).Include(x => x.User).Include(x => x.PostMediaContents.Select(y => y.MediaContent)));
            
            if (id != null)
            {
                query = query.Where(x => x.User.Id == id);
            }
            if (status != null)
            {
                query = query.Where(x => x.Status == (int)status);
            }
            var list = query.ToList().Select(x => CreatePostViewModel(x, 1)).OrderByDescending(x => x.CreatedOn).ToList();
            return list;
        }

        public void Remove(int id)
        {
            _repository.UpdateProperty<Post>(id, "IsDeleted", true);
            _repository.Commit();
        }

        public void Update(PostModel model)
        {
            var post = GetPostById(model.Id);
            post.Status = (int)PostStatus.NeedVerify;
            Mapper.Map(model, post);
            _repository.RemoveRange<PostTag>(x => x.PostId == model.Id);
            foreach (var tagId in model.SelectedTags)
            {
                _repository.Add<PostTag>(new PostTag {PostId = post.Id, TagId = tagId});
            }
            
            if (model.Images.Count != 0)
            {
                _repository.Remove<PostMediaContent>(x => x.PostId == post.Id);
                var savedFileId = SavePostFile(model);

                _repository.Add(new PostMediaContent() { MediaContentId = savedFileId, PostId = model.Id });
                _repository.Commit();
            }
            _repository.Update(post);
            _repository.Commit();
        }
    }
}
