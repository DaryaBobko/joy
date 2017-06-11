using System.Net.Mime;
using Joy.Business.Services.Repositories;
using JoyBusinessService.Models;
using JoyBusinessService.Services.Interfaces;
using Model;

namespace JoyBusinessService.Services.Implementations
{
    public class MailService : IMailService
    {

        private readonly IRepository _repository;
        public MailService(IRepository repository)
        {
            _repository = repository;
        }

        public void SendMailToUser(MailModel model)
        {
            _repository.Add(new UserMail() {FromId = model.FromId, ToId = model.ToId, Text = model.Text});
            _repository.Commit();
        }
    }
}