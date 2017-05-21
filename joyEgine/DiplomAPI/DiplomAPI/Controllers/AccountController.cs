using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DiplomAPI.Filters;
using Joy.Business.Services.Repositories;
using JoyBusinessService;
using JoyBusinessService.Helpers;
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

        [JoyActionFilter]
        [Route("api/account/register")]
        public UserPrivateInfoViewModel Post(UserInfoModel userInfoModel)
        {
            if (!_repository.Query<User>().Any(x => x.Email == userInfoModel.Email))
            {
                var user = new User()
                {
                    Email = userInfoModel.Email,
                    Password = userInfoModel.Password,
                    UserName = userInfoModel.Email
                };
                _repository.Add(user);
                _repository.Commit();
                
                return new UserPrivateInfoViewModel()
                {
                    Tocken = CryptoHelper.EncryptStringAES(userInfoModel.Email),
                    UserInfo = new UserInfoModel() { UserId = user.Id, Email = userInfoModel.Email}
                };
            }
            Request.Properties.Add("RegisterAuthStatus", RegisterAuthorizeStatus.UserExists);
            return null;
        }

        [JoyActionFilter]
        [Route("api/account/auth")]
        public UserPrivateInfoViewModel PostAuth(UserInfoModel userInfoModel)
        {
            var user = _repository.Get<User>(x => x.Email == userInfoModel.Email);
            if (user != null)
            {
                if (user.Password == userInfoModel.Password)
                {
                    return new UserPrivateInfoViewModel()
                    {
                        Tocken = CryptoHelper.EncryptStringAES(userInfoModel.Email),
                        UserInfo = new UserInfoModel() { UserId = user.Id, Email = userInfoModel.Email}
                    };
                }
            }
            Request.Properties.Add("RegisterAuthStatus", RegisterAuthorizeStatus.Unauthorized);
            return null;
        }


        [Route("api/account/getUserInfo")]
        [HttpPost]
        public UserPrivateInfoViewModel GetUserInfo()
        {
            var test = Request.Headers.First(y => y.Key == "tocken").Value.First();
            var userEmail = CryptoHelper.DecryptStringAES(Request.Headers.First(y => y.Key == "tocken").Value.First());
            var user = _repository.Get<User>(x => x.Email == userEmail);
            if (user != null)
            {
                    return new UserPrivateInfoViewModel()
                    {
                        UserInfo = new UserInfoModel() { UserId = user.Id, Email = user.Email }
                    };
            }
            return null;
        }
    }
}
