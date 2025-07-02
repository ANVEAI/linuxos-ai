/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { createContext, useContext, useState, useCallback, useMemo, } from 'react';
const OverflowStateContext = createContext(undefined);
const OverflowActionsContext = createContext(undefined);
export const useOverflowState = () => useContext(OverflowStateContext);
export const useOverflowActions = () => useContext(OverflowActionsContext);
export const OverflowProvider = ({ children, }) => {
    const [overflowingIds, setOverflowingIds] = useState(new Set());
    const addOverflowingId = useCallback((id) => {
        setOverflowingIds((prevIds) => {
            if (prevIds.has(id)) {
                return prevIds;
            }
            const newIds = new Set(prevIds);
            newIds.add(id);
            return newIds;
        });
    }, []);
    const removeOverflowingId = useCallback((id) => {
        setOverflowingIds((prevIds) => {
            if (!prevIds.has(id)) {
                return prevIds;
            }
            const newIds = new Set(prevIds);
            newIds.delete(id);
            return newIds;
        });
    }, []);
    const stateValue = useMemo(() => ({
        overflowingIds,
    }), [overflowingIds]);
    const actionsValue = useMemo(() => ({
        addOverflowingId,
        removeOverflowingId,
    }), [addOverflowingId, removeOverflowingId]);
    return (<OverflowStateContext.Provider value={stateValue}>
      <OverflowActionsContext.Provider value={actionsValue}>
        {children}
      </OverflowActionsContext.Provider>
    </OverflowStateContext.Provider>);
};
//# sourceMappingURL=OverflowContext.js.map