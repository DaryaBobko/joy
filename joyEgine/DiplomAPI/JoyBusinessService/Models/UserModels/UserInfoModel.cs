using System.Collections.Generic;
using JoyBusinessService.Models.UrlModels;

namespace JoyBusinessService.Models.UserModels
{
    public class UserInfoModel
    {
        public int? UserId { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public List<int> Roles { get; set; }
        public string Avatar { get; set; }
        public List<UrlViewModel> Images { get; set; }

    }
}
