using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DiplomAPI.Filters;

namespace DiplomAPI.Controllers.Base
{
    [JoyActionFilter]
    [JoyAutorize]
    public class BaseController : ApiController
    {
    }
}
