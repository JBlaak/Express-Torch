export default {
    index: (req, res) => {
        res.json([{
            id: 1,
            content: 'Some story'
        }]);
    }
}
