/* eslint-disable import/no-unresolved,import/extensions,no-new */
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

async function request(url, method = 'GET', data = null) {
    try {
        let body;
        const headers = {};
        if (data) {
            console.log(`Data: ${data}`);
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
            console.log(`Data: ${body}`);
        }
        const response = await fetch(url, {
            method,
            headers,
            body,
        });
        return await response.json();
    } catch (e) {
        console.warn(`Error: ${e.match}`);
    }
}

new Vue({
    el: '#start',
    data: {
        name: 'vue.js',
        isPutMethod: false,
        userInput: {
            GETLectureID: '',
            studentName: '',
        },
        formInput: {
            theme: '',
            lecturer: '',
            classroom: '',
            group: '',
            day: '',
            time: '',
        },
        urlForAPI: '',
        //dataToServer: '',
        lecturesID: [],
        lecturers: [],
        groups: [],
        serverResponse: '',
    },
    methods: {
        makeGET() {
            this.urlForAPI = `/api/lectures/${this.userInput.GETLectureID}`;
            request(this.urlForAPI)
                .then((res) => JSON.parse(JSON.stringify(res)))
                .then((data) => {
                    if (data.reason) {
                        this.serverResponse = 'Status code: 404';
                    } else {
                        this.serverResponse = data;
                    }
                })
                .catch((err) => console.log(err));
        },
        // async addStudent() {
        //     const studentData = {
        //         name: this.userInput.studentName,
        //         group: this.formInput.group,
        //     };
        //     await request('/api/students', 'POST', studentData)
        //         .then(() => { this.userInput.studentName = ''; })
        //         .catch((err) => console.log(err));
        // },
        async createPostMethod() {
            const { ...lectureData } = this.formInput;
            console.log(lectureData);
            request('/api/lectures', 'POST', lectureData)
                .then(() => {
                    this.formInput.theme = '';
                    this.formInput.lecturer = '';
                    this.formInput.classroom = '';
                    this.formInput.group = '';
                    this.formInput.day = '';
                    this.formInput.time = '';
                })
                .catch((err) => console.log(err));
        },
    },
    async mounted() {
        this.lecturesID = await request('/api/lectures');
        this.lecturers = await request('/api/lecturers');
        this.groups = await request('/api/groups');
        console.log(this.lecturers);
    },
});
