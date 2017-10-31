pragma solidity ^0.4.2;

contract JobsD {
    uint MAX_QUEUE_LENGTH = 5;

    struct Job { // Struct
        bytes32 title;
        bytes32 company;
        bytes32 body;
        bytes32 link;
        bytes32 contact;
    }

    Job[] jobs;

    address public foundation_wallet;
    function JobsD(address _wallet) {
        foundation_wallet = _wallet;
    }

    function addJob(bytes32 title, bytes32 company, bytes32 body, bytes32 link, bytes32 contact) public payable {
        if (msg.value < 1e10) {
            return;
        }

        foundation_wallet.transfer(msg.value);

        if (jobs.length <= MAX_QUEUE_LENGTH) {
            jobs.push(Job(title, company, body, link, contact));

            if (jobs.length == MAX_QUEUE_LENGTH + 1) {
                jobs[0].title = "";
            }
            return;
        }

        for (uint i = 0; i < jobs.length; i++) {
            if (jobs[i].title == "") {
                jobs[i] = Job(title, company, body, link, contact);
                jobs[(i + 1) % MAX_QUEUE_LENGTH].title = "";
                return;
            }
        }
    }

    function getJobs() constant public returns (bytes32[], bytes32[], bytes32[], bytes32[], bytes32[]) {
        uint len = jobs.length;
        if (len == MAX_QUEUE_LENGTH + 1) {
            len = MAX_QUEUE_LENGTH;
        }

        bytes32[] memory title = new bytes32[](len);
        bytes32[] memory company = new bytes32[](len);
        bytes32[] memory body = new bytes32[](len);
        bytes32[] memory link = new bytes32[](len);
        bytes32[] memory contact = new bytes32[](len);

        uint j = 0;

        for (uint i = 0; i < jobs.length; i++) {
            if (jobs[i].title == "") {
            } else {
                Job storage job = jobs[i];

                title[j] = job.title;
                company[j] = job.company;
                body[j] = job.body;
                link[j] = job.link;
                contact[j] = job.contact;
                j++;
            }

        }

        return (title, company, body, link, contact);
    }
}