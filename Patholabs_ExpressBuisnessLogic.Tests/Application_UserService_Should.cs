using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using Patholabs_Express.BuisnessLogic.DTOs;
using Patholabs_Express.BuisnessLogic.Services;
using Patholabs_Express.DataAccess.Entities;

namespace Patholabs_ExpressBuisnessLogic.Tests
{
    [TestFixture]
    class Application_UserService_Should
    {
        private User_ApplicationService service;
        private UserDto user;
        [OneTimeSetUp]
        public void Init()
        {
            service = new User_ApplicationService();
            user = new UserDto();
        }

        [OneTimeTearDown]
        public void Cleanup()
        {
            service.Dispose();
        }

        [Test]
        public void Return_All_Users()
        {
            var user = service.GetAll();
            CollectionAssert.IsNotEmpty(user);

        }

        


       

    }
}

