function setOptionsPost(service, service_path,data, orionPath) {
        return {
            method: 'POST',
            uri: orionPath + 'entities?options=keyValues',
            headers: {
                "Content-Type": 'application/json',
                "Fiware-Service": service,
                "Fiware-ServicePath": service_path
            },
            body: data,
            json: true
        }
}

function setOptionsPatch(service, service_path,data, orionPath) {
    return {
        method: 'POST',
        uri: orionPath + 'entities/' + data.id + '/attrs?options=keyValues',
        headers: {
            "Content-Type": 'application/json',
            "Fiware-Service": service,
            "Fiware-ServicePath": service_path
        },
        body: Object.assign({}, data, {
                id: undefined,
                type: undefined
            }),
        json: true
      }
}

    exports = module.exports = {
        setOptionsPost,
        setOptionsPatch
    }