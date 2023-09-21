using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Patholabs_Express.BuisnessLogic.DTOs;
using Patholabs_Express.BuisnessLogic.Services;
using Patholabs_Express.DataAccess.Entities;

namespace Patholabs_Express.API.Controllers
{
    public class HelpDeskController : ApiController
    {
        private readonly HelpDeskService helpdeskService;

        public HelpDeskController()
        {
            helpdeskService = new HelpDeskService();

        }

        [HttpPost]
        public IHttpActionResult Add([FromBody] HelpDeskDto obj)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                helpdeskService.Add(obj);
                return Ok(new Responce() { Success = true, Message = "Help Added Successfully" });
            }
        }
    }
}
