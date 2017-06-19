using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;
using DiplomAPI.Controllers.Base;
using DiplomAPI.Filters;
using Joy.Business.Services.Repositories;
using JoyBusinessService;
using JoyBusinessService.Helpers;
using JoyBusinessService.Models;
using JoyBusinessService.Models.UrlModels;
using JoyBusinessService.Models.UserModels;
using JoyBusinessService.Services;
using Model;

namespace DiplomAPI.Controllers
{
   
    public class AccountController : BaseController
    {
        private readonly IRepository _repository;
        public AccountController(IRepository repository)
        {
            _repository = repository;
        }

        [AllowAnonymous]
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
                    UserName = userInfoModel.Email,
                };
                _repository.Add(user);
                _repository.Commit();

                _repository.Add<UserToRole>(new UserToRole() {RoleId = (int) JoyBusinessService.Enums.UserRole.User, UserId = user.Id});
                _repository.Commit();

                return new UserPrivateInfoViewModel()
                {
                    Tocken = CryptoHelper.EncryptStringAES(userInfoModel.Email),
                    UserInfo = CreateUserInfo(user)
                };
            }
            Request.Properties.Add("RegisterAuthStatus", RegisterAuthorizeStatus.UserExists);
            return null;
        }

        [AllowAnonymous]
        [JoyActionFilter]
        [Route("api/account/auth")]
        public UserPrivateInfoViewModel PostAuth(UserInfoModel userInfoModel)
        {
            var user = _repository.Get<User>(x => x.Email == userInfoModel.Email, i => i.Include(x => x.UserToRoles));
            if (user != null)
            {
                if (user.Password == userInfoModel.Password)
                {
                    return new UserPrivateInfoViewModel()
                    {
                        Tocken = CryptoHelper.EncryptStringAES(userInfoModel.Email),
                        UserInfo = CreateUserInfo(user)
                    };
                }
            }
            Request.Properties.Add("RegisterAuthStatus", RegisterAuthorizeStatus.Unauthorized);
            return null;
        }


        [AllowAnonymous]
        [Route("api/account/getUserInfo")]
        [HttpPost]
        public UserPrivateInfoViewModel GetUserInfo(UserInfoModel userInfoModel)
        {
            var userEmail = CryptoHelper.DecryptStringAES(Request.Headers.First(y => y.Key == "tocken").Value.First());
            
            var user = userInfoModel.UserId == null ? _repository.Get<User>(x => x.Email == userEmail, x => x.Include(i => i.UserToRoles).Include(i => i.MediaContent)) : _repository.Get<User>(x => x.Id == userInfoModel.UserId, x => x.Include(i => i.UserToRoles).Include(i => i.MediaContent));
            
            if (user != null)
            {
                    return new UserPrivateInfoViewModel()
                    {
                        UserInfo = CreateUserInfo(user)
                    };
            }
            return null;
        }

        public UserInfoModel CreateUserInfo(User user)
        {
            var imagePath = user.MediaContent?.Path;
            imagePath = imagePath?.Substring(imagePath.IndexOf("content", StringComparison.Ordinal));
            return new UserInfoModel()
            {
                UserId = user.Id,
                Email = user.Email,
                Roles = user.UserToRoles.Select(x => x.RoleId).ToList(),
                Avatar = imagePath,
                Images = new List<UrlViewModel>() { new UrlViewModel() { url = imagePath} }
            };
        }

        [Route("api/account/changeUserInfo")]
        [HttpPost]
        public UserPrivateInfoViewModel ChangeUserInfo(AccountModel model)
        {
            var user = _repository.Get<User>(model.Id);
            if (user != null)
            {
                if (!string.IsNullOrEmpty(model.NewEmail))
                {
                    user.Email = model.NewEmail;
                }
                if (!string.IsNullOrEmpty(model.NewPassword))
                {
                    if (CryptoHelper.EnctyptPassword(model.OldPassword) == user.Password)
                    {
                        user.Password = model.NewPassword;
                    }
                    else
                    {
                        throw new HttpResponseException(HttpStatusCode.BadRequest);
                    }
                }
                if (model.Images.Count() != 0)
                {
                    var fileId = FileSaverService.SaveModelFile(model.Images, _repository);
                    user.AvatarId = fileId;
                }
                _repository.Commit();
            }
            else
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            return new UserPrivateInfoViewModel()
            {
                UserInfo = CreateUserInfo(user)
            };
        }
    }
}
