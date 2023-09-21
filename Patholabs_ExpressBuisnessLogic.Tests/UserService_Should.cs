using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using Patholabs_Express.BuisnessLogic;
using Patholabs_Express.BuisnessLogic.Services;

namespace Patholabs_ExpressBuisnessLogic.Tests
{
    [TestFixture]
    public class UserService_Should
    {
        private UserService service;
        [OneTimeSetUp]
        public void Init()
        {
            service = new UserService();
        }

        [OneTimeTearDown]
        public void Cleanup()
        {
            service.Dispose();
        }
        [Test]
        public void Return_All_Users()
        {
            var user = service.getall();
            CollectionAssert.IsNotEmpty(user);
            
        }


        

      
    }
}
