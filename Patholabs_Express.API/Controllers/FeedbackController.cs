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
    public class FeedbackController : ApiController
    {
      
            private readonly FeedbackService feedbackService;

            public FeedbackController()
            {
                feedbackService = new FeedbackService();

            }

            [HttpPost]
            public IHttpActionResult Add([FromBody] FeedbackDto obj)
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                else
                {
                    feedbackService.Add(obj);
                    return Ok(new Responce() { Success = true, Message = "Feedback Added Successfully" });
                }

          
                






            }
        }
}
