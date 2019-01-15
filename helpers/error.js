const zooId404 = res => {
    console.log('test');
    res.status(404).json({
        errMessage: 'A zoo by this id does not exist',
    });
};

module.exports = { zooId404 };
