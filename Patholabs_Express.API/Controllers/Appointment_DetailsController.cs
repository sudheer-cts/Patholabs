using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Patholabs_Express.BuisnessLogic.DTOs;
using Patholabs_Express.BuisnessLogic.Services;
using Patholabs_Express.DataAccess.Entities;
using Patholabs_Express.DataAccess.Repository;

namespace Patholabs_Express.API.Controllers
{
    public class Appointment_DetailsController : ApiController
    {
        private readonly Appointment_DetailsService appDetailsService;

        public Appointment_DetailsController()
        {
            appDetailsService = new Appointment_DetailsService();
        }
        [HttpPost]
      // [Route("AppointmentDetails/addAppointment")]
        public IHttpActionResult Add([FromBody] Appointment_DetailsDto obj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                appDetailsService.Add(obj);
                return Ok(new Responce() { Success = true, Message = "Appointment Booked Successfully" });
            }

        }
        //Cancel Appointment
        [HttpDelete]
        [Route("api/Appointment_Details/Delete/{AppointmentId}")]
        public IHttpActionResult Delete([FromUri] int AppointmentId)
        {
            var Removed = appDetailsService.Remove(AppointmentId);
            if (Removed == true)
                return Ok(new Responce() { Success = true, Message = "Appointment Cancelled Successfully" });
            return BadRequest();
        }

        //get by id Appointmentdetails
        [HttpGet]
        public IHttpActionResult Get( int id)
        {
            var Items = appDetailsService.GetAppDetails(id);
            if (Items != null)
                return Ok(new Responce() { Success = true, Message = "Appointment Cancelled Successfully", Result=Items });
            return NotFound();
        }


        [HttpGet]
        public IHttpActionResult Get()
        {

            return Ok(new Responce() { Success = true, Message = "Appointment Details Fetched Successfully", Result = appDetailsService.getall() });

        }

        [HttpPut]
        public IHttpActionResult UpdateAppointmentDetails([FromBody] Appointment_DetailsDto obj)

        {
            var item = appDetailsService.UpdateAppointment(obj);
            if (item == true)
            {
                return Ok(new Responce() { Success = true, Message = "Appointment updated successfully" });
            }
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("api/Appointment_Details/GetReport/{fromdate}/{todate}")]
        public IHttpActionResult GetSalesReport( DateTime fromdate , DateTime todate)
        {
            var result = appDetailsService.GetAllSalesData(fromdate, todate);
            if (result!=null && result.Count != 0) 
            return Ok(new Responce() { Success = true, Message = "Appointment Details Fetched Successfully", Result = result });
            else
            {
                return BadRequest();
            }

        }

        [HttpGet]
        [Route("api/Appointment_Details/GetAppointmentDetails/{id}")]
        public IHttpActionResult GetApp([FromUri] int id)
        {
            var Items = appDetailsService.GetAppIdDetails(id);
            if (Items != null)
                return Ok(new Responce() { Success = true, Message = "Appointment Cancelled Successfully", Result = Items });
            return NotFound();
        }



    }
}
