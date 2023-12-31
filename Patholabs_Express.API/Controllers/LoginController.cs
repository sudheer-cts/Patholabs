﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Patholabs_Express.API.Models;
using Patholabs_Express.BuisnessLogic;
using Patholabs_Express.BuisnessLogic.DTOs;
using System.Web.Http.Cors;
using Patholabs_Express.DataAccess.Entities;

namespace Patholabs_Express.API.Controllers
{
   
    public class LoginController : ApiController
    {
        private readonly User_AdminService loginService;
        public LoginController()
        {
            loginService = new User_AdminService();
        }

        [HttpPost]
        public IHttpActionResult Auth([FromBody] LoginDto loginDto)
        {
            var user = loginService.Authenticate(loginDto.Email, loginDto.Password, loginDto.UserType);

            if (user == null)
                return Ok(new Responce() { Success = false });
            return Ok(new Responce() { Success = true, Result = user });
        

        }
    }
}
