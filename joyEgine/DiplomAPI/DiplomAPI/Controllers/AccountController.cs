using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Joy.Business.Services.Repositories;
using JoyBusinessService.Models;
using JoyBusinessService.Models.UserModels;
using Model;

namespace DiplomAPI.Controllers
{
    public class AccountController : ApiController
    {
        private readonly IRepository _repository;
        public AccountController(IRepository repository)
        {
            _repository = repository;
        }
        public UserInfoViewModel Post(UserInfoModel userInfoModel)
        {
            if (!_repository.Query<User>().Any(x => x.Email == userInfoModel.Email))
            {
                _repository.Add(new User() {Email = userInfoModel.Email, Password = userInfoModel.Password});
                return new UserInfoViewModel()
                {
                    Tocken = "asd",
                    UserInfo = new UserInfoModel() {Email = userInfoModel.Email}
                };
            }
            return new UserInfoViewModel();
        }
    }
}
