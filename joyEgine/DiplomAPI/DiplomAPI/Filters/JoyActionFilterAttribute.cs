using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Mvc;
using Joy.Business.Services.Repositories;
using JoyBusinessService;
using JoyBusinessService.Helpers;
using JoyBusinessService.Services.Implementations;
using Model;
using ActionFilterAttribute = System.Web.Http.Filters.ActionFilterAttribute;

namespace DiplomAPI.Filters
{
    public class JoyActionFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Contains("tocken"))
            {
                var repository = DependencyResolver.Current.GetService<IRepository>();
                var userEmail = CryptoHelper.DecryptStringAES(actionContext.Request.Headers.First(y => y.Key == "tocken").Value.First());

                var user = repository.Get<User>(x => x.Email == userEmail);
                if (user != null)
                {
                    var identity = new UserIdentity()
                    {
                        AuthenticationType = "tocken",
                        IsAuthenticated = true,
                        Name = user.Id.ToString()
                    };
                    HttpContext.Current.User = new Principal(identity);
                }
            }
        }
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            var registerAuthStatus = actionExecutedContext.Request.Properties.FirstOrDefault(x => x.Key == "RegisterAuthStatus");
            if (!registerAuthStatus.Equals(default(KeyValuePair<string, object>)))
            {
                switch ((int)registerAuthStatus.Value)
                {
                    case (int)RegisterAuthorizeStatus.UserExists:
                        {
                            actionExecutedContext.Response.Headers.Add("AuthStatus", ((int)RegisterAuthorizeStatus.UserExists).ToString());
                            actionExecutedContext.Response.StatusCode = System.Net.HttpStatusCode.Conflict;
                            break;
                        }
                    case (int)RegisterAuthorizeStatus.Unauthorized:
                        {
                            actionExecutedContext.Response.StatusCode = System.Net.HttpStatusCode.Unauthorized;
                            break;
                        }
                    case (int)RegisterAuthorizeStatus.BadLogin:
                    {
                            actionExecutedContext.Response.Headers.Add("AuthStatus", ((int)RegisterAuthorizeStatus.BadLogin).ToString());
                            actionExecutedContext.Response.StatusCode = System.Net.HttpStatusCode.Conflict;
                            break;
                    }
                }
            }
        }
    }
}