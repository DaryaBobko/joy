using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DiplomAPI.Controllers.Base;
using JoyBusinessService.Models;
using JoyBusinessService.Services.Interfaces;

namespace DiplomAPI.Controllers
{
    public class RatingController : BaseController
    {

        private readonly IRatingService _ratingService;

        public RatingController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }

        [HttpPost]
        public bool Post(RatingModel model)
        {
            return _ratingService.ChangeRating(model);
        }

    }
}
