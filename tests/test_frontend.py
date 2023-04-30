import time
import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By

DRIVERS = {'chrome': "/Users/mentelis/Downloads/chromedriver_mac64/chromedriver",
           'firefox': "/Users/mentelis/Downloads/geckodriver"}


class MyTestCase(unittest.TestCase):
    def setUp(self):
        self.driver_path = DRIVERS['chrome']
        self.driver = webdriver.Chrome(executable_path=self.driver_path)
        self.driver.get("http://localhost:3000/")
        assert "React" in self.driver.title

    def test_login(self):

        window_before = self.driver.window_handles[0]
        self.driver.find_element(By.ID, "google login").click()
        window_after = self.driver.window_handles[1]
        self.driver.switch_to.window(window_after)
        self.driver.find_elements_by_name("identifier")[0].send_keys("marking2@gmail.com")
        self.driver.find_elements_by_id("identifierNext")[0].click()
        self.driver.switch_to.window(window_before)
        time.sleep(2)
        assert "ME" in self.driver.page_source

    def test_read_more_button(self):
        elem = self.driver.find_element(By.ID, "read more")
        elem.click()
        assert "chapter" in self.driver.current_url

    def test_home_page_button(self):
        self.driver.find_element(By.ID, "read more").click()
        elem = self.driver.find_element(By.ID, "home page")
        elem.click()
        assert self.driver.current_url == "http://localhost:3000/"
        self.close_driver()

    def test_comment_post(self):
        text = "This is a test comment"
        self.driver.find_element(By.ID, "read more").click()
        elem = self.driver.find_element(By.ID, "comment")
        elem.send_keys(text)
        elem = self.driver.find_element(By.ID, "add-comment-btn")
        elem.click()
        time.sleep(5)
        assert text in self.driver.page_source

    # def test_comment_edit(self):
    #     text = "This is an edited test comment"

    # def test_comment_delete(self):

    def close_driver(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
