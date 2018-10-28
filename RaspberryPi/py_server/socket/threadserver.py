import argparse, select, socket,threading
from _thread import *

locker = threading.Lock()

class SuperColorMultiServer:
    def __init__(self):
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.client_list = []
        self.color_list = ["yellow", "green", "blue", "white", "pink", "black", "red", "orange", "purple"]
        self.current_color = ""
        self.broadcast_count = 0

    def start(self, addr="127.0.0.1", port=1234):
        self.server_socket.bind((addr, port))
        self.server_socket.listen(5)

    def get_client(self):
        (connection, address) = self.server_socket.accept()
        self.client_list.append([connection, "", ""])   # each element of the client list is a list of connection,
        return connection                                                            # received message and the broadcast color of the connection

    def threaded(self,connection):
        for client in self.client_list:
            if client[1] == '':
                while 1:
                    buffered = connection.recv(2048)
                    if not buffered:
                        locker.release()
                        break
                    message = buffered.decode()
                    client[1] = message
                    print("Received message: {}".format(message))
                    if server.client_ready():
                        server.advance_color()
                        server.broadcast_color()
                    if server.all_client_quit():
                        server.close()
                connection.close()


    def recv_mesg(self):
        for client in self.client_list:
            if client[1] == '':
                buf = client[0].recv(2048)
                if not buf:
                    locker.release()
                    # Decode data
                    message = buf.decode()
                    client[1] = message
                    print("Received message: {}".format(message))

    def client_ready(self):
        for client in self.client_list:
            if client[1] != 'REDY_MSG':
                return False
        return True

    def all_client_quit(self):
        if not self.client_list:
            return True
        for client in self.client_list:
            if client[1] != 'QUIT_MSG':
                return False
        return True

    def close(self):
        self.server_socket.close()

    def broadcast_color(self):
        for client in self.client_list:
            client[0].send(client[2].encode())
            client[1] = ""
            client[2] = ""

    def advance_color(self):
        for client in self.client_list:
            self.current_color = self.color_list[self.broadcast_count % len(self.color_list)]
            client[2] = self.current_color
        self.broadcast_count = self.broadcast_count + 1

    def remove_quit_client(self):
        for client in self.client_list:
            if client[1] == 'QUIT_MSG':
                self.client_list.remove(client)

def main():
    """ parse the ip and port to connect to """
    parser = argparse.ArgumentParser()
    parser.add_argument('--ip', type=str, default="127.0.0.1",
                        help='IP address of server')
    parser.add_argument('--port', type=int, default=1234,
                        help='port number of server')
    args = parser.parse_args()

    addr_str = args.ip
    port_int = args.port

    server = SuperColorMultiServer()
    server.start(addr_str, port_int)

    while 1:
        connection = server.get_client()
        
        locker.acquire()
        start_new_thread(threaded, (connection,))
    server.close()

if __name__ == "__main__":
    main()