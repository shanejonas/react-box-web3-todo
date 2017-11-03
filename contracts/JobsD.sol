pragma solidity ^0.4.2;

contract JobsD {
    uint MAX_QUEUE_LENGTH = 50;
    uint ADD_JOB_COST = 1e10;

    struct Job { // Struct
        bytes32 title;
        bytes32 company;
        bytes32 body0;
        bytes32 body1;
        bytes32 body2;
        bytes32 body3;
        bytes32 body4;
        bytes32 link;
        bytes32 contact;
        bytes32 logoUrl;
    }

    Job[] jobs;

    address private foundation_wallet;
    function JobsD(address _wallet) {
        foundation_wallet = _wallet;
    }

    function addJob(
        bytes32 title,
        bytes32 company,
        bytes32 body0,
        bytes32 body1,
        bytes32 body2,
        bytes32 body3,
        bytes32 body4,
        bytes32 link,
        bytes32 contact,
        bytes32 logoUrl
    ) public payable {
        assert(msg.value < ADD_JOB_COST);

        foundation_wallet.transfer(msg.value);

        if (jobs.length <= MAX_QUEUE_LENGTH) {
            jobs.push(Job(title, company, body0, body1, body2, body3, body4, link, contact, logoUrl));

            if (jobs.length == MAX_QUEUE_LENGTH + 1) {
                jobs[0].title = "";
            }
            return;
        }

        for (uint i = 0; i < jobs.length; i++) {
            if (jobs[i].title == "") {
                jobs[i] = Job(title, company, body0, body1, body2, body3, body4, link, contact, logoUrl);
                jobs[(i + 1) % MAX_QUEUE_LENGTH].title = "";
                return;
            }
        }
    }

    function getTitle() constant public returns (bytes32[]) {
        uint len = getAdjustedLength();
        bytes32[] memory title = new bytes32[](len);
        uint j = 0;
        for (uint i = 0; i < jobs.length; i++) {
            if (jobs[i].title == "") {
            } else {
                Job storage job = jobs[i];
                title[j] = job.title;
                j++;
            }
        }
        return title;
    }

    function getCompany() constant public returns (bytes32[]) {
        uint len = getAdjustedLength();
        bytes32[] memory company = new bytes32[](len);
        uint j = 0;
        for (uint i = 0; i < jobs.length; i++) {
            if (jobs[i].title == "") {
            } else {
                Job storage job = jobs[i];
                company[j] = job.company;
                j++;
            }
        }
        return company;
    }

    function getBody() constant public returns (bytes32[], bytes32[], bytes32[], bytes32[], bytes32[]) {
        uint len = getAdjustedLength();
        bytes32[] memory body0 = new bytes32[](len);
        bytes32[] memory body1 = new bytes32[](len);
        bytes32[] memory body2 = new bytes32[](len);
        bytes32[] memory body3 = new bytes32[](len);
        bytes32[] memory body4 = new bytes32[](len);
        uint j = 0;
        for (uint i = 0; i < jobs.length; i++) {
            if (jobs[i].title == "") {
            } else {
                Job storage job = jobs[i];
                body0[j] = job.body0;
                body1[j] = job.body1;
                body2[j] = job.body2;
                body3[j] = job.body3;
                body4[j] = job.body4;
                j++;
            }
        }
        return (body0, body1, body2, body3, body4);
    }

    function getLink() constant public returns (bytes32[]) {
        uint len = getAdjustedLength();
        bytes32[] memory link = new bytes32[](len);
        uint j = 0;
        for (uint i = 0; i < jobs.length; i++) {
            if (jobs[i].title == "") {
            } else {
                Job storage job = jobs[i];
                link[j] = job.link;
                j++;
            }
        }
        return link;
    }

    function getContact() constant public returns (bytes32[]) {
        uint len = getAdjustedLength();
        bytes32[] memory contact = new bytes32[](len);
        uint j = 0;
        for (uint i = 0; i < jobs.length; i++) {
            if (jobs[i].title == "") {
            } else {
                Job storage job = jobs[i];
                contact[j] = job.contact;
                j++;
            }
        }
        return contact;
    }

    function getLogoUrl() constant public returns (bytes32[]) {
        uint len = getAdjustedLength();
        bytes32[] memory logoUrl = new bytes32[](len);
        uint j = 0;
        for (uint i = 0; i < jobs.length; i++) {
            if (jobs[i].title == "") {
            } else {
                Job storage job = jobs[i];
                logoUrl[j] = job.logoUrl;
                j++;
            }
        }
        return logoUrl;
    }

    function getAdjustedLength() constant private returns (uint) {
        uint len = jobs.length;
        if (len == MAX_QUEUE_LENGTH + 1) {
            len = MAX_QUEUE_LENGTH;
        }
        return len;
    }
}
