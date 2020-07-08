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
    el: '#root',
    data: {
        isPostMethod: false,
        isPutMethod: false,
        URL: '',
        serverResponse: '',
        lecturesID: [],
        lecturers: [],
        groups: [],
        selectedGroups: [],
        serverResponseArray: [],
        userInput: {
            GETLectureID: '',
            PUTLectureID: '',
            DELETELectureID: '',
        },
        formInput: {
            theme: '',
            lecturer: '',
            classroom: '',
            group: [],
            groupID: '',
            day: '',
            time: '',
        },
    },
    methods: {
        showLecture() {
            this.URL = `/api/lectures/${this.userInput.GETLectureID}`;
            request(this.URL)
                .then((res) => JSON.parse(JSON.stringify(res)))
                .then((data) => {
                    if (data.reason) {
                        this.serverResponse = 'Incorrect lecture ID. Try another.';
                    } else {
                        if (typeof data === typeof [] && data.length > 1) {
                            this.serverResponse = '';
                            this.serverResponseArray = data;
                        } else {
                            if (data.length <= 0) {
                                this.serverResponse = 'Lectures not found.'
                            } else {
                                this.serverResponse = data;
                            }
                        }
                        this.userInput.GETLectureID = '';
                    }
                })
                .catch((err) => console.log(err));
        },
        handlePOST() {
            this.isPostMethod = !this.isPostMethod;
            this.serverResponse = '';
            this.userInput.GETLectureID = '';
            this.isPutMethod = false;
        },
        addGroup() {
            let isGroupIDExist = false;
            this.selectedGroups = [];
            if (this.formInput.groupID.length < 1) {
                return;
            } else if (this.formInput.group.length === 0) {
                this.formInput.group.push(this.formInput.groupID)
            } else {
                for (let i = 0; i < this.formInput.group.length; i++) {
                    if (this.formInput.group[i] === this.formInput.groupID) {
                        isGroupIDExist = true;
                    }
                }
                if (!isGroupIDExist) {
                    this.formInput.group.push(this.formInput.groupID)
                }
            }
            this.handleSelectedGroups();
        },
        createLecture() {
            const { ...lectureData } = this.formInput;
            request('/api/lectures', 'POST', lectureData)
                .then((res) => JSON.parse(JSON.stringify(res)))
                .then((data) => {
                    this.serverResponse = data;
                })
                .then(() => {
                    this.formInput.theme = '';
                    this.formInput.lecturer = '';
                    this.formInput.classroom = '';
                    this.formInput.group = [];
                    this.formInput.day = '';
                    this.formInput.time = '';
                })
                .catch((err) => console.log(err));
        },
        handleSelectedGroups() {
            // this.selectedGroups = [];
            for (let i = 0; i < this.formInput.group.length; i++) {
                for (let j = 0;  j < this.groups.length; j++) {
                    if (this.formInput.group[i] === this.groups[j]._id) {
                        this.selectedGroups.push(this.groups[j].name);
                    }
                }
            }
        },
        handlePUT() {
            this.isPostMethod = false;
            if (!this.userInput.PUTLectureID) {
                this.serverResponse = 'Please, enter lecture ID in PUT input.';
            } else {
                this.serverResponse = this.serverResponseArray = '';
                this.URL = `/api/lectures/${this.userInput.PUTLectureID}`;
                request(this.URL)
                    .then((res) => JSON.parse(JSON.stringify(res)))
                    .then((data) => {
                        if (data.reason) {
                            this.serverResponse = 'Incorrect lecture ID. Try another.';
                        } else if (typeof data === typeof '') {
                            this.serverResponse = data;
                        } else {
                            this.URL = '';
                            this.formInput.theme = data.theme;
                            this.formInput.lecturer = data.lecturer;
                            this.formInput.classroom = data.classroom;
                            this.formInput.day = data.day;
                            this.formInput.time = data.time;
                            this.isPutMethod = !this.isPutMethod;
                        }
                    })
                    .catch((err) => console.log(err));
            }
        },
        async updateLecture() {
            const { ...lectureData } = this.formInput;
            lectureData.id = this.userInput.PUTLectureID;
            request(`/api/lectures/${this.userInput.PUTLectureID}`, 'PUT', lectureData)
                .then(() => {
                    this.serverResponse = 'Changed';
                    this.userInput.PUTLectureID = '';
                    this.isPutMethod = false;
                    this.selectedGroups = [];
                })
                .catch((err) => console.log(err));
        },
        deleteLecture() {
            if (!this.userInput.DELETELectureID) {
                this.serverResponse = 'Please, enter lecture ID in DELETE input.';
            } else {
                this.URL = `/api/lectures/${this.userInput.DELETELectureID}`;
                const data = {
                    id: this.userInput.DELETELectureID
                }
                request(this.URL, 'DELETE', data)
                    .then((res) => JSON.parse(JSON.stringify(res)))
                    .then((data) => this.serverResponse = data)
                    .then(() => this.userInput.DELETELectureID = '')
                    .catch((err) => console.log(err));
            }
        },
    },
    async mounted() {
        this.lecturesID = await request('/api/lectures');
        this.lecturers = await request('/api/lecturers');
        this.groups = await request('/api/groups');
    },
});
