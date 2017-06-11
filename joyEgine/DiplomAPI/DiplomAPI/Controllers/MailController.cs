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
    public class MailController : BaseController
    {

        private readonly IMailService _mailService;
        public MailController(IMailService mailService)
        {
            _mailService = mailService;
        }

        [HttpPost]
        public void Post(MailModel model)
        {
            _mailService.SendMailToUser(model);

        }
    }
}
