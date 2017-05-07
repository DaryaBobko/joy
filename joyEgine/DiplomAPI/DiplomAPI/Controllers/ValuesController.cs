using Joy.Business.Services.Repositories;
using Joy.Data.Common;
using JoyBusinessService.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DiplomAPI.Controllers.Base;

namespace DiplomAPI.Controllers
{
    [JoyAutorize]
    public class ValuesController : ApiController
    {
        
        private readonly IValueService _valueService;

        public ValuesController(IValueService valueService)
        {
            _valueService = valueService;
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "as";
        }

        public IEnumerable<string> Get(int id1, int id2)
        {
            return new string[] { "ss", "ss" };
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
