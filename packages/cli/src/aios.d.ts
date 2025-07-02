#!/usr/bin/env node
/**
 * LinuxOS-AI - Interactive AI System Administrator
 * Built on Gemini CLI with Enhanced System Management
 */
import React from 'react';
interface AIOSProps {
    mode?: 'enhanced' | 'standard';
    args?: string[];
}
declare const AIOSApp: React.FC<AIOSProps>;
export { AIOSApp };
