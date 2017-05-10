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
        public UserInfoViewModel Post(UserInfoModel userInfoModel)
        {
            if (!_repository.Query<User>().Any(x => x.Email == userInfoModel.Email))
            {
                _repository.Add(new User() {Email = userInfoModel.Email, Password = userInfoModel.Password, UserName = ""});
                _repository.Commit();
                
                return new UserInfoViewModel()
                {
                    Tocken = CryptoHelper.EncryptStringAES(userInfoModel.Email),
                    UserInfo = new UserInfoModel() {Email = userInfoModel.Email}
                };
            }
            Request.Properties.Add("RegisterAuthStatus", RegisterAuthorizeStatus.UserExists);
            return null;
        }

        [JoyActionFilter]
        [Route("api/account/auth")]
        public UserInfoViewModel PostAuth(UserInfoModel userInfoModel)
        {
            var user = _repository.Get<User>(x => x.Email == userInfoModel.Email);
            if (user != null)
            {
                if (user.Password == userInfoModel.Password)
                {
                    return new UserInfoViewModel()
                    {
                        Tocken = CryptoHelper.EncryptStringAES(userInfoModel.Email),
                        UserInfo = new UserInfoModel() {Email = userInfoModel.Email}
                    };
                }
            }
            Request.Properties.Add("RegisterAuthStatus", RegisterAuthorizeStatus.Unauthorized);
            return null;
        }
    }
}
