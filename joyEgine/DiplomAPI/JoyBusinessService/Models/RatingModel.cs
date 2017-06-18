namespace JoyBusinessService.Models
{
    public class RatingModel
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public bool IsUp { get; set; }
    }
}