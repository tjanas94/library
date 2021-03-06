import FormStore from "stores/FormStore"
import { toJS, action, runInAction } from "mobx"
import moment from "moment"

export default class LendingSearchStore extends FormStore<
  ILendingStore,
  ILendingQuery
> implements ILendingSearchStore {
  public async sendRequest() {
    runInAction(() => (this.data.page = 1))
    await this.parentStore.fetchLendings(this.convertToRequest(toJS(this.data)))
  }

  @action.bound
  public clear() {
    this.data = this.convertFromRequest(toJS(this.parentStore.query))
    this.error = {
      message: "",
      visible: false,
    }
    this.pending = false
  }

  private convertToRequest(data: ILendingQuery) {
    const createdAfter = moment(data.created__gte, "YYYY-MM-DD", true)
    const createdBefore = moment(data.created__lte, "YYYY-MM-DD", true)
    return {
      page: data.page,
      user: data.user,
      status: data.status,
      created__gte: createdAfter.isValid() ? createdAfter.unix() : undefined,
      created__lte: createdBefore.isValid() ? createdBefore.unix() : undefined,
    }
  }

  private convertFromRequest(data: ILendingRequest) {
    return {
      page: data.page || 1,
      user: data.user || "",
      status: data.status || "",
      created__gte: data.created__gte
        ? moment(data.created__gte, "X", true).format("YYYY-MM-DD")
        : "",
      created__lte: data.created__lte
        ? moment(data.created__lte, "X", true).format("YYYY-MM-DD")
        : "",
    }
  }
}
