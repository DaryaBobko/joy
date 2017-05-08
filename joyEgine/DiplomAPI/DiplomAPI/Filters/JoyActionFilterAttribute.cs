using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;
using JoyBusinessService;

namespace DiplomAPI.Filters
{
    public class JoyActionFilterAttribute : ActionFilterAttribute
    {
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
                }
            }
        }
    }
}