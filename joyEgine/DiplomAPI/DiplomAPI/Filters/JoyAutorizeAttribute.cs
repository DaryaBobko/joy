using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http.Controllers;
using System.Web.Mvc;
using Joy.Business.Services.Repositories;
using JoyBusinessService.Helpers;
using Model;
using AuthorizeAttribute = System.Web.Http.AuthorizeAttribute;


namespace DiplomAPI.Filters
{
    public class JoyAutorizeAttribute : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {

            if (actionContext.Request.Headers.Contains("tocken"))
            {
                var repository = DependencyResolver.Current.GetService<IRepository>();
                //var allUsers = repository.GetList<User>();
                var test = actionContext.Request.Headers.First(y => y.Key == "tocken").Value.First();
                var userEmail = CryptoHelper.DecryptStringAES(actionContext.Request.Headers.First(y => y.Key == "tocken").Value.First());

                return repository.Any<User>(x => x.Email == userEmail);
                //foreach (var user in allUsers)
                //{
                //    var encodedLoginPassword = Encoding.Default.GetString(sha256.ComputeHash(Encoding.UTF8.GetBytes($"{user.Email}{user.Password}")));
                //    userHashes.Add(encodedLoginPassword);
                //}
                //if (userHashes.Any(x => actionContext.Request.Headers.First(y => y.Key == "tocken").Value.First() == x))
                //{
                //    return true;
                //}
            }
            return false;
        }
    }
}