using System.Security.Principal;
using Joy.Business.Services.Repositories;
using Joy.Data.Common;
using JoyBusinessService.Models;
using JoyBusinessService.Services.Interfaces;
using Model;

namespace JoyBusinessService.Services.Implementations
{
    public class RatingService : IRatingService
    {

        private readonly IRepository _repository;

        public RatingService(IRepository repository)
        {
            _repository = repository;
        }
        public bool ChangeRating(RatingModel model)
        {
            var identity = ServiceLocator.GetService<IIdentity>();
            var userId = int.Parse(identity.Name);
            var postRating = _repository.Get<PostRating>(x => x.PostId == model.PostId && x.UserId == userId);
            if (postRating != null)
            {
                if (postRating.IsLike == model.IsUp)
                {
                    return false;
                }
                else
                {
                    postRating.IsLike = model.IsUp;
                }
            }
            else
            {
                _repository.Add(new PostRating() {PostId = model.PostId, UserId = userId, IsLike = model.IsUp });
            }
            _repository.Commit();
            return true;
        }
    }
}