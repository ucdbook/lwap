

module.exports = function (app) {
    app.use('/componentApi/',require('./childAppApi'));
    app.use('/componentApi/',require('./masterAppNavsApi'));
    app.use('/componentApi/',require('./componentMockApi'));
}