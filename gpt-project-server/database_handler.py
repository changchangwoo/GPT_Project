from flask_mysqldb import MySQL
from datetime import datetime
import json
class DatabaseHandler:
    def __init__(self, mysql):
        self.mysql = mysql

    def login(self, username, password):
        cur = self.mysql.connection.cursor()
        cur.execute("SELECT * FROM userprofile WHERE userid = %s AND userpw = %s", (username, password))
        user = cur.fetchone()
        cur.close()

        if user:
            return '로그인 성공'
        else:
            return '로그인 실패'

    def register(self, id, pw):
        cur = self.mysql.connection.cursor()
        query = "SELECT * FROM userprofile WHERE userid = %s"
        cur.execute(query, (id,))
        existing_user = cur.fetchone()

        if existing_user:
            return '중복'

        query = "INSERT INTO userprofile (userid, userpw) VALUES (%s, %s)"
        cur.execute(query, (id, pw))
        self.mysql.connection.commit()
        cur.close()

        return '성공'

    def get_data(self, user_id):
        cur = self.mysql.connection.cursor()
        query = "SELECT * FROM userdata WHERE userid = %s"
        cur.execute(query, (user_id,))

        data = cur.fetchall()
        cur.close()

        data_list = []
        for row in data:
            data_dict = {
                'userid': row[1],
                'name': row[2],
                'nickname': row[3],
                'mood': row[4],
                'personal': row[5],
                'message_box': row[6],
                'img': row[7],
                'date': row[8],
                'descript': row[9],
                'messages': row[10]
            }
            data_list.append(data_dict)

        return data_list

    def delete_data(self, user_id, obj_name, obj_nickname):
        cur = self.mysql.connection.cursor()
        cur.execute("DELETE FROM userdata WHERE userid = %s AND name = %s AND nickname = %s",
                    (user_id, obj_name, obj_nickname))
        self.mysql.connection.commit()
        cur.close()

        return '데이터 삭제 성공'

    def save_to_database(self, user_id, obj_name, obj_nickname, mood, personal, message, img, descript, messages):
        cur = self.mysql.connection.cursor()
        current_date = datetime.now().strftime("%Y-%m-%d")
        cur.execute(
            "INSERT INTO userdata (userid, name, nickname, mood, personal, message_box, img, date, descript, messages) VALUES (%s, %s, %s, %s, %s, %s, %s, %s ,%s, %s)",
            (user_id, obj_name, obj_nickname, mood, personal, message, img, current_date, descript, messages))
        self.mysql.connection.commit()
        cur.close()

    def update_user_info(self, message, user_id, obj_name, obj_nickname, messages):
        cur = self.mysql.connection.cursor()
        message_json = json.dumps(message)
        messages_json = json.dumps(messages)
        cur.execute(
            "UPDATE userdata SET message_box = %s, messages = %s WHERE userid = %s AND name = %s AND nickname = %s",
            (message_json, messages_json, user_id, obj_name, obj_nickname))
        self.mysql.connection.commit()
        cur.close()
