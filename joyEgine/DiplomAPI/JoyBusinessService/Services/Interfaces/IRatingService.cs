using JoyBusinessService.Models;

namespace JoyBusinessService.Services.Interfaces
{
    public interface IRatingService
    {
        bool ChangeRating(RatingModel model);
    }
}