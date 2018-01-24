import Service from '@ember/service';

var connection;

export default Service.extend({
    queue: [],

    init() {
        if(!connection) {
            var ws = new WebSocket("ws://localhost:8080/ws");

            ws.onmessage = (event) => {
                var data = JSON.parse(event.data);
                this.gotData(data);
            }

            ws.onopen = () => {
                this.get("queue").forEach(element => {
                    ws.send(element);
                });
            }

            connection = ws;
        }
    },

    send(message) {
        if(connection.readyState != "OPEN") {
            this.get("queue").push(message);
            return;
        }

        connection.send(message);
    },

    gotData(data) {
        this.get("resolve")(data);
    },

    setQuery(query) {
        this.send("query:" + query);
    },

    findAll(store, type, sinceToken) {
        this.send("get all:searchResults");

        return new Ember.RSVP.Promise((resolve, reject) => {
            this.set("resolve", resolve);
        });
    }
});
