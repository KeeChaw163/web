"""
    @auyhor: 欢乐干饭人小组
    @content: 爬取新闻动态数据
    @time: 2022.12.15
"""

import urllib
import pandas as pd
import pymysql
from lxml import etree
from selenium import webdriver
import time

class spiders_news_mzb(object):

    # 模仿浏览器点击
    def imitate_click(self):
        dr = webdriver.Chrome()
        dr.get("https://www.baidu.com/")
        print("--------进入百度---------")
        dr.save_screenshot("../results/Screenshot/img1.png")
        # 通过链id定位页面元素
        print("--------输入关键字(民政部)---------")
        dr.find_element_by_id("kw").send_keys(u"民政部")
        print("--------点击(百度一下)---------")
        dr.find_element_by_id("su").click()
        time.sleep(2)
        dr.save_screenshot("../results/Screenshot/img2.png")
        # 通过链接文本定位页面元素
        print("--------点击进入(中华人民共和国民政部官网)---------")
        dr.find_element_by_link_text("中华人民共和国民政部_中华人民共和国民政部门户网站").click()
        # 获取当前窗口的句柄
        handles = dr.window_handles
        # 切换至新打开的标签
        dr.switch_to.window(handles[1])
        time.sleep(2)
        dr.save_screenshot("../results/Screenshot/img3.png")
        print("--------点击进入(查询服务)---------")
        select = dr.find_element_by_xpath("//div[@class='nav']/ul/div/li[5]/div/p/a[4]")
        # 修改为执行脚本
        dr.execute_script("arguments[0].click()", select)
        # 获取当前窗口的句柄
        handles = dr.window_handles
        # 切换至新打开的标签
        dr.switch_to.window(handles[1])
        time.sleep(2)
        dr.save_screenshot("../results/Screenshot/img4.png")
        print("--------点击(全国行政区划信息查询平台)---------")
        dr.find_element_by_xpath("//div[@class='list_right']/ul/li[2]/a").click()
        # 获取当前窗口的句柄
        handles = dr.window_handles
        # 切换至新打开的标签
        dr.switch_to.window(handles[2])
        time.sleep(2)
        dr.save_screenshot("../results/Screenshot/img5.png")
        print("--------点击(行政区划变更情况)---------")
        dr.find_element_by_xpath("//div[@class='mid_con_qt']/span[1]/a[1]").click()
        time.sleep(2)
        # 获取当前窗口的句柄
        handles = dr.window_handles
        # 切换至新打开的标签
        dr.switch_to.window(handles[3])
        dr.save_screenshot("/results/Screenshot/img6.png")
        # base_url = dr.page_source
        url = dr.current_url
        dr.close()
        dr.quit()
        base_url = url[0:-1]
        print(base_url)
        return base_url

    # 爬取年份输入
    def input_year(self):
        end_year = int(input("请输入新闻终止年份:"))
        begin_year = int(input("请输入新闻起始年份:"))
        year_list = [end_year, begin_year]
        return year_list

    # 发送爬取网页的请求
    def load_page(self, base_url, year_list):
        user_agent = "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36;"
        headers = {"User-Agent": user_agent}
        htmls = ''
        for year in range(year_list[1], year_list[0]+1):
            url = base_url+str(year)
            print(url)
            request = urllib.request.Request(url, headers=headers)
            # 获取每页HTML源代码字符串
            response = urllib.request.urlopen(request)
            html = response.read().decode("gbk")
            htmls += html
        return htmls

    # 解析网页数据
    def parse_page(self, htmls):

        root = etree.HTML(htmls)

        news = root.xpath("//div[@class='tz_con']/p")

        # 定义空列表，以保存元素的信息
        items = []
        for i in range(0, len(news)):
            item = []
            item.append(news[i].text)
            items.append(item)
        return items

    # 将数据保存在csv文件中
    def save_file(self, items, item_row):
        test = pd.DataFrame(columns=item_row, data=items)
        # dir = os.getcwd()
        dir = 'D:/Code/PythonCode/spider_job_2022-202.1/results/result'
        test.to_csv(dir + "/news_mzb.csv", encoding='utf-8-sig')
        print("数据已解析，并保存在" + dir + "路径下的news_mzb.csv文件中，请前往查看！")

    # 将数据保存在MySQL数据库中
    def save_mysql(self, items):
        print("---------开始连接MySQL---------")
        db = pymysql.connect(host='localhost', user='root', password='root', port=3306, db='sql_spider')
        cur = db.cursor()
        print('---------开始创建表---------')
        sql_drop = "DROP TABLE IF EXISTS news_mzb;"
        cur.execute(sql_drop)
        sql = 'CREATE TABLE news_mzb(new_contents CHAR(255)) CHARSET=utf8 COLLATE utf8_general_ci;'
        cur.execute(sql)
        print("---------news_mzb表创建成功---------")
        for data in items:
            # print(data)
            sql = 'insert into news_mzb(new_contents)values(%s)'
            try:
                cur.execute(sql, data)
            except TypeError:
                pass
        print("---------插入成功---------")
        cur.close()
        db.commit()
        db.close()
        return "数据已解析，并保存在MySQL数据库sql_spider下的news_mzb表中，请前往查看！"
