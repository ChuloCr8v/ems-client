import { useCallback, useEffect, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendError } from '../utils/sendError';
import type { AuthState } from '../api/data/auth';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import type { AuthUser } from '../api/types';
import { EmployeeStatus, JobType, Role, StagePermission } from '../api/types';
import type { RootState } from '../store';
import { clearAuth, setAuth } from '../store/slices/authSlice';
import { useGetMeQuery } from '../api/data/users';

const noUser: AuthUser = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    level: { id: '', name: '', rank: 0 },
    department: { id: '', name: '', departmentHeadId: '' },
    approverOf: [],
    eId: 0,
    isAdmin: false,
    workDays: [],
    active: true,
    jobTitle: '',
    jobType: JobType.FULLTIME,
    user: { firstName: '', lastName: '', name: '' },
    stage: { id: '', name: '', position: 0, permission: StagePermission.LEAVE },
    userRole: undefined,
    status: EmployeeStatus.INACTIVE,
    gender: "MALE",
    startDate: "",
    role: Role.USER,
    invite: [],
    address: "",
    contacts: {
        emergency: {
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            relationship: ""
        },
        guarantor: {
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            relationship: ""
        }
    }
};

type ApiResult<T> = T | Promise<T> | { unwrap(): Promise<T> };

export function useAuthComplete() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useCallback(
        (value: ApiResult<AuthState>, event?: FormEvent) => {
            event?.preventDefault();
            const dispatchAuth = (auth: AuthState) => {
                dispatch(setAuth(auth));
                navigate('/employees', { replace: true });
            };
            if ('unwrap' in value) {
                value.unwrap().then(dispatchAuth).catch(sendError);
            } else if ('then' in value) {
                value.then(dispatchAuth).catch(sendError);
            } else {
                dispatchAuth(value);
            }
        },
        [dispatch, navigate]
    );
}

export function useAuth() {
    return useAppSelector((state: RootState) => state.auth);
}

export function useAuthUser() {
    const authToken = useAppSelector(state => state.auth?.access_token);
    const { data: user } = useGetMeQuery(undefined, { skip: !authToken });
    return user ?? noUser;
}

export function useAuthUserRequired(): AuthUser {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authToken = useAppSelector(state => state.auth?.access_token);
    const { data: user, error } = useGetMeQuery(undefined, { skip: !authToken });


    useEffect(() => {
        const status = error && 'status' in error ? error.status : undefined;
        if (!authToken || status === 401) {
            navigate('/auth', { replace: true });
            dispatch(clearAuth());
        }
    }, [authToken, dispatch, error, navigate]);

    return user ?? noUser;
}
