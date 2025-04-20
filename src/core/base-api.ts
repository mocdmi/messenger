export default abstract class BaseAPI {
    create(_data?: unknown) {
        throw new Error('Method not implemented.');
    }

    request(_data?: unknown) {
        throw new Error('Method not implemented.');
    }

    update(_data?: unknown) {
        throw new Error('Method not implemented.');
    }

    delete(_data?: unknown) {
        throw new Error('Method not implemented.');
    }
}
