"""
    @auyhor: 欢乐干饭人小组
    @content: 查询页面数据
    @time: 2022.12.15
"""

import json
import pymysql

class sql_select():
    conn = pymysql.connect(
        host='localhost',
        user='root',
        password='root',
        db='sql_spider',
        charset='utf8')

    # 查询所有省份数据
    def select1(self, conn):
        cur = conn.cursor()

        sql = "select * from province_people_area"
        cur.execute(sql)
        content = cur.fetchall()
        # print(type(content))

        content_list = (list(content))
        content_recording_list = []
        for i in content_list:
            content_recording_list.append(list(i))
            # print(content_recording_list)
        new_content_recording_list = json.dumps(content_recording_list, ensure_ascii=False)
        return new_content_recording_list

    # 查询2020年省份数据
    def select2(self, conn):
        cur = conn.cursor()

        sql_2020 = "SELECT * FROM `province_people_area` WHERE province_year=2020"
        cur.execute(sql_2020)
        content_2020 = cur.fetchall()

        content_list_2020 = (list(content_2020))
        content_recording_list_2020 = []
        for i in content_list_2020:
            content_recording_list_2020.append(list(i))
        # print(content_recording_list)
        new_content_recording_list_2020 = json.dumps(content_recording_list_2020, ensure_ascii=False)
        return new_content_recording_list_2020

    # 查询甘肃省数据
    def select3(self, conn):
        cur = conn.cursor()

        sql_gs = "SELECT * FROM `province_people_area` WHERE province_name='甘肃省' ORDER BY province_year DESC"
        cur.execute(sql_gs)
        content_gs = cur.fetchall()

        content_list_gs = (list(content_gs))
        content_recording_list_gs = []
        for i in content_list_gs:
            content_recording_list_gs.append(list(i))
        # print(content_recording_list)
        new_content_recording_list_gs = json.dumps(content_recording_list_gs, ensure_ascii=False)
        return new_content_recording_list_gs

    # 查询中国历年人口数据
    def select4(self, conn):
        cur = conn.cursor()

        sql_china = "SELECT * FROM `china_people`"
        cur.execute(sql_china)
        content_china = cur.fetchall()

        content_list_china = (list(content_china))
        content_recording_list_china = []
        for i in content_list_china:
            content_recording_list_china.append(list(i))
        # print(content_recording_list)
        new_content_recording_list_china = json.dumps(content_recording_list_china, ensure_ascii=False)
        return new_content_recording_list_china

    # 查询所有新闻动态数据
    def select5(self, conn):
        cur = conn.cursor()

        sql_news = "SELECT * FROM `news_mzb`"
        cur.execute(sql_news)
        content_news = cur.fetchall()

        content_list_news = (list(content_news))
        content_recording_list_news = []
        for i in content_list_news:
            content_recording_list_news.append(list(i))
        # print(content_recording_list)
        new_content_recording_list_news = json.dumps(content_recording_list_news, ensure_ascii=False)

        return new_content_recording_list_news