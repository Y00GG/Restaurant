import type { IGetWaiter, IWaiterState } from "@interfaces/IWaiter";
import api from "@utils/api";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useWaiterStore = create<IWaiterState>()(
	devtools(
		(set) => ({
			loading: false,
			getWaiters: async () => {
				try {
					const { data } = await api.get<IGetWaiter>(
						"/meseros/search?page=1&size=10",
					);

                    console.log(data)
					
				} catch (error) {
					console.log(error);
				}
			},
		}),
		{ anonymousActionType: "waiter" },
	),
);
