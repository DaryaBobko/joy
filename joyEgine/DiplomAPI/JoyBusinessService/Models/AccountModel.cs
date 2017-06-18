using DevTeam.FileFormatter;

namespace JoyBusinessService.Models
{
    public class AccountModel : FileContentList
    {
        public int Id { get; set; }
        public string NewEmail { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}