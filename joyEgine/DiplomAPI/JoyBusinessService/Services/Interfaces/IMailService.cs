using Joy.Business.Services.Repositories;
using JoyBusinessService.Models;

namespace JoyBusinessService.Services.Interfaces
{
    public interface IMailService
    {
        void SendMailToUser(MailModel model);
    }
}