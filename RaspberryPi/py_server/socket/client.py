import argparse
import socket


class ColorClient:

    def __init__(self, name):
        self.name = name
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def connect(self, ip="127.0.0.1", port=1234):
        self.client_socket.connect((ip, port))

    def disconnect(self):
        self.client_socket.send(b'QUIT_MSG')
        self.client_socket.shutdown(1)
        self.client_socket.close()

    def send_ready(self):
        self.client_socket.send(b'REDY_MSG')

    def get_current_color(self):
        buf = self.client_socket.recv(2048)
        received_data = buf.decode()
        return received_data


"""
Main:

Start ColorClient, advance with Command Line Interface
"""
def main():
    """ parse the ip and port to connect to """
    parser = argparse.ArgumentParser()
    parser.add_argument('--ip', type=str, default="127.0.0.1",
                        help='IP address of server')
    parser.add_argument('--name', type=str, default="interactive_client",
                        help="client name")
    parser.add_argument('--port', type=int, default=1234,
                        help='port number of server')
    args = parser.parse_args()

    name_str = args.name
    addr_str = args.ip
    port_int = args.port

    # create client instance
    color_client = ColorClient(args.name)
    # connect to server at (addr, port, key)
    color_client.connect(ip=addr_str, port=port_int,)

    # loop:
    #   print current color
    #   get input: quit or continue
    #   sendReady
    while True:
        if input("q to quit, c to continue> ") is 'q':
            break
        color_client.send_ready()
        color = color_client.get_current_color()  # get color from the server
        print("Color is {:}".format(color))
    # all done, now disconnect from server
    color_client.disconnect()
    print("client {:} disconnected.".format(name_str))


if __name__ == "__main__":
    main()