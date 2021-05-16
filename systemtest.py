import unittest, os, time
from app import app, db 
from app.models import User, TestAttempt
from selenium import webdriver
from datetime import datetime
from uuid import uuid4

basedir = os.path.abspath(os.path.dirname(__file__))

class SystemTest(unittest.TestCase):
    driver = None
    def setUp(self):
        self.driver = webdriver.Chrome(executable_path=r"C:\Users\maxdi\Downloads\chromedriver_win32\chromedriver") 
        # TODO need the line above to be constant, cannot have my own executable_path
        # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'        
        # db.create_all() 
        self.driver.get('http://127.0.0.1:5000/')
    
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.driver.close()
        
    
    def test_create_user_test(self):
        self.driver.get('http://127.0.0.1:5000/sign-up')
        self.driver.implicitly_wait(5)
        eventid = datetime.now().strftime('%Y%m-%d%H-%M%S-')
        print('event id is', eventid)
        time.sleep(1)
        user_signup_sheet = self.driver.find_element_by_id("username")
        user_signup_sheet.send_keys(eventid)
        # time.sleep(10)
        self.driver.implicitly_wait(5)

        user_password = self.driver.find_element_by_id("password")
        user_password.send_keys('coolUser')
        user_password_confirm = self.driver.find_element_by_id("passwordConfirm")
        user_password_confirm.send_keys('coolUser')
        submit_button = self.driver.find_element_by_name("")

        submit_button.click()

        self.driver.get('http://127.0.0.1:5000/learn/test-1')
        ans1_to_q1 = self.driver.find_element_by_id("1A")
        ans1_to_q2 = self.driver.find_element_by_id("2A")
        ans1_to_q3 = self.driver.find_element_by_id("3A")
        ans1_to_q4 = self.driver.find_element_by_id("4A")
        ans1_to_q5 = self.driver.find_element_by_id("5")
        submit_t1 = self.driver.find_element_by_id("submit")

        ans1_to_q1.click()
        ans1_to_q2.click()
        ans1_to_q3.click()
        ans1_to_q4.click()
        ans1_to_q5.send_keys("5")
        submit_t1.click()
        self.driver.implicitly_wait(5)

        self.driver.get('http://127.0.0.1:5000/learn/test-2')
        ans2_to_q1 = self.driver.find_element_by_id("1A")
        ans2_to_q2 = self.driver.find_element_by_id("2A")
        ans2_to_q3 = self.driver.find_element_by_id("3A")
        ans2_to_q4 = self.driver.find_element_by_id("4A")
        ans2_to_q5 = self.driver.find_element_by_id("5A")
        submit_t2 = self.driver.find_element_by_id("submit")

        ans2_to_q1.click()
        ans2_to_q2.click()
        ans2_to_q3.click()
        ans2_to_q4.click()
        ans2_to_q5.click()
        submit_t2.click()
        self.driver.implicitly_wait(5)


        self.driver.get('http://127.0.0.1:5000/learn/test-3')
        ans3_to_q1 = self.driver.find_element_by_id("1")
        ans3_to_q2 = self.driver.find_element_by_id("2A")
        ans3_to_q3 = self.driver.find_element_by_id("3A")
        ans3_to_q4 = self.driver.find_element_by_id("4")
        ans3_to_q5 = self.driver.find_element_by_id("5")
        submit_t3 = self.driver.find_element_by_id("submit")

        ans3_to_q1.send_keys("10")
        ans3_to_q2.click()
        ans3_to_q3.click()
        ans3_to_q4.send_keys("4")
        ans3_to_q5.send_keys("4")
        submit_t3.click()
        self.driver.implicitly_wait(5)

        self.driver.get('http://127.0.0.1:5000/learn')
        time.sleep(2)

        self.driver.get('http://127.0.0.1:5000/logout')
   
        time.sleep(10)
        # relogin
        self.driver.get('http://127.0.0.1:5000/login')
        user_signup_sheet = self.driver.find_element_by_id("username")
        user_signup_sheet.send_keys(eventid)

        self.driver.implicitly_wait(5)

        user_password = self.driver.find_element_by_id("password")
        user_password.send_keys('coolUser')

        submit_button2 = self.driver.find_element_by_name("")
        submit_button2.click()
        time.sleep(15)



    


        



if __name__ =='__main__':
    unittest.main(verbosity=2)