import Service from '@ember/service';

export default Service.extend({
    connection: null,
    queue: [],

    init() {
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

        this.set("connection", ws);
    },

    send(message) {
        if(this.get("connection").readyState != "OPEN") {
            this.get("queue").push(message);
            return;
        }

        this.get("connection").send(message);
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
