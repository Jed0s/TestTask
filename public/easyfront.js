/* eslint-disable import/no-unresolved,import/extensions,no-new */
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

async function request(url, method = 'GET', data = null) {
    try {
        let body;
        const headers = {};
        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
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
        isPostMethod: false,
        isPutMethod: false,
        userInput: {
            GETLectureID: '',
            PUTLectureID: '',
            DELETELectureID: '',
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
        //serverData: {},
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
                        this.userInput.GETLectureID = '';
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
        changeIsPostMethod() { // RENAME THIS FUNCTION AFTER TESTS
            this.isPostMethod = !this.isPostMethod;
            this.serverResponse = '';
            this.userInput.GETLectureID = '';
            this.isPutMethod = false;
        },
        async makePutMethod() {
            this.isPostMethod = false;
            if (this.userInput.PUTLectureID) {
                this.serverResponse = '';
                this.urlForAPI = `/api/lectures/${this.userInput.PUTLectureID}`;
                request(this.urlForAPI)
                    .then((res) => JSON.parse(JSON.stringify(res)))
                    .then((data) => {
                        if (data.reason) {
                            this.serverResponse = 'Status code: 404';
                        } else {
                            this.formInput.theme = data.theme;
                            console.log(data);
                            this.formInput.lecturer = data.lecturer;
                            this.formInput.classroom = data.classroom;
                            this.formInput.group = data.group;
                            this.formInput.day = data.day;
                            this.formInput.time = data.time;
                            this.isPutMethod = !this.isPutMethod;
                        }
                    })
                    .catch((err) => console.log(err));
            } else {
                this.serverResponse = 'Please, enter lecture ID in PUT input.';
            }
        },
        async updateLecture() {
            const { ...lectureData } = this.formInput;
            lectureData._id = this.userInput.PUTLectureID;
            request(`/api/lectures/${this.userInput.PUTLectureID}`, 'PUT', lectureData)
                .then(() => {
                    this.serverResponse = 'Changed';
                })
                .catch((err) => console.log(err));
        },
        makeDeleteMethod() {
            if (!this.userInput.DELETELectureID) {
                this.serverResponse = 'Please, enter lecture ID in DELETE input.';
            } else {
                this.urlForAPI = `/api/lectures/${this.userInput.DELETELectureID}`;
                const data = {
                    id: this.userInput.DELETELectureID
                }
                request(this.urlForAPI, 'DELETE', data)
                    .then((res) => JSON.parse(JSON.stringify(res)))
                    .then((data) => this.serverResponse = data)
                    .catch((err) => console.log(err));
            }
        }
    },
    async mounted() {
        this.lecturesID = await request('/api/lectures');
        this.lecturers = await request('/api/lecturers');
        this.groups = await request('/api/groups');
    },
});
