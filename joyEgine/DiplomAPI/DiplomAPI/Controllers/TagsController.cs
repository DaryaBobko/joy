using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DiplomAPI.Controllers
{
    public class TagsController : ApiController
    {
        public string[] Get()
        {
            return new string[] { "кухня", "спорт","юмор","отдых" };
        }
    }
}
