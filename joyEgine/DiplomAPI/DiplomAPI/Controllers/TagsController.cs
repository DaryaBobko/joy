using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Joy.Business.Services.Repositories;
using JoyBusinessService.Models;
using JoyBusinessService.Services.Implementations;
using JoyBusinessService.Services.Interfaces;

namespace DiplomAPI.Controllers
{
    public class TagsController : ApiController
    {
        private readonly ITagService _tagService;
        public TagsController(ITagService tagService)
        {
            _tagService = tagService;
        }
        public List<IdNameModel> Get()
        {
            return _tagService.GetAll();
        }

        public int Post(IdNameModel tag)
        {
            return _tagService.AddTag(tag);
        }
    }
}
